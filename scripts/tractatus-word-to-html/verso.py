#!/usr/bin/env python
# coding: utf-8

import docx
from guess_language import guess_language
import re
import json
import pandas as pd

dot = "·"

doc = docx.Document("verso.docx")

all_paras = doc.paragraphs

sections = []
for para in all_paras:
    runs = para.runs
    for run in runs:
        if (dot not in para.text):
            #if run.italic:
                #text = run.text
                #run.text = '<em>'+text+'</em>'
            if run.underline:
                text = run.text
                underline_type = str(run.underline)
                if underline_type == 'True':
                    run.text = "<span class='underline_single'>"+text+"</span>"
                if underline_type == 'DOUBLE (3)':
                    run.text = "<span class='underline_double'>"+text+"</span>"
    if (re.search("\S", para.text)):
        sections.append(para.text)

bigList = []
node = []
for section in sections:
    if ('Ms-' in section):
        if node:
            bigList.append(node)
            node = []
    node.append(section)

def extractIsoDate(dotdate):
    if re.match("[0-9]+[.]+[0-9]+[.]+[0-9]+", dotdate):
        lame = dotdate.split(".")
        day = lame[0]
        if len(day) == 1:
            day = "0" + day
        month = lame[1]
        if len(month) == 1:
            month = "0" + month
        year = "19" + lame[2]
        iso = year + '-' + month + '-' + day
        return iso

def extractItems(items):
    obj = {}
    obj['type'] = "verso"
    obj['manuscript'] = ""
    obj['ger'] = ""
    obj['eng'] = ""
    obj['date'] = ""
    obj["pt-number"] = ""
    obj["pt-page"] = ""
    obj["tlp-number"] = ""
    obj["cross-references"] = ""
    obj["original-type"] = ""
    for item in items:
        date = extractIsoDate(item)
        if date:
            obj['date'] = date
        if ('Ms-' in item):
            obj['manuscript'] = item                
            if ("v" in item):
                obj["original-type"] = "verso"
            else:
                obj["original-type"] = "recto"
        if (guess_language(item) == 'de' or guess_language(item) == 'fr' or guess_language(item) == 'el'):
            obj['ger'] += item + '<br>'
        if (guess_language(item) == 'en' or guess_language(item) == 'el'):
            obj['eng'] += item + '<br>'
        if (dot in repr(item) and "Cf" not in repr(item)):
            loc = item.split('\t')
            for i in range(len(loc)):
                if (dot in loc[i] and loc.index(loc[i]) == 0):
                    obj["pt-number"] = loc[i]
                if ("[" in loc[i]):
                    obj["pt-page"] = loc[i]
                if (dot in loc[i] and loc.index(loc[i]) > 0):
                    obj["tlp-number"] = loc[i]
                if ("." in loc[i]):
                    obj["cross-references"] = loc[i]
    return obj

sternJson = []
for item in bigList:
    this = extractItems(item)
    sternJson.append(this)

with open('verso.json', 'w', encoding='utf8') as f:
    json.dump(sternJson, f, indent=4, ensure_ascii=False)





