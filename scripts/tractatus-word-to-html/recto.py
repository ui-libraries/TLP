#!/usr/bin/env python
# coding: utf-8

import docx
from guess_language import guess_language
import re
import json
import pandas as pd


dot = "·"

doc = docx.Document("recto.docx")

all_paras = doc.paragraphs

sections = []
for para in all_paras:
    runs = para.runs
    for run in runs:
        if (dot not in para.text):
            if run.italic:
                text = run.text
                run.text = '<em>'+text+'</em>'
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

def extractIsoDate(manuscriptName):
    dateSearch = re.search("19[0-9]+--[0-9]+", manuscriptName)
    if (dateSearch):
        date = dateSearch.group(0)
        year = date[0:4]
        month = date[6:8]
        day = date[8:10]
        iso = year + '-' + month + '-' + day
        return iso

def extractItems(items):
    obj = {}
    obj['type'] = "recto"
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
        if ('Ms-' in item):
            obj['manuscript'] = item
            date = extractIsoDate(item)
            if date:
                obj['date'] = date
            if ("v" in item):
                obj["original-type"] = "verso"
            else:
                obj["original-type"] = "recto"
        if ("&&F" in item):
            obj['ger'] += item + "<br>"
            obj['eng'] += item + "<br>"
        if ("&&G" in item):
            new_ger = item.replace("&&G ", "")
            obj['ger'] += new_ger + " "
        if ("&&E" in item):
            new_eng = item.replace("&&E ", "")
            obj['eng'] += new_eng + " "
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


with open('recto.json', 'w', encoding='utf8') as f:
    json.dump(sternJson, f, indent=4, ensure_ascii=False)




