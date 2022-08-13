#!/usr/bin/env python
# coding: utf-8

import docx
import re
import json
import sys
docType = sys.argv[1]
dot = "·"


def formatParas(paras):
    formatted_paras = []
    for para in paras:
        runs = para.runs
        for run in runs:
            if (dot not in para.text):
                if run.font.strike:
                    text = run.text
                    run.text = '<s>'+text+'</s>'
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
            formatted_paras.append(para.text)
    return formatted_paras


# returns a list of section lists. 2D list.
def createSections(paras):
    list = []
    section = []
    for para in paras:
        if ('Ms-' in para):
            if section:
                list.append(section)
                section = []
        section.append(para)
    return list


def extractIsoDate(str):
    iso = ""
    if (docType == "recto"):
        dateSearch = re.search("19[0-9]+--[0-9]+", str)
        if (dateSearch):
            date = dateSearch.group(0)
            year = date[0:4]
            month = date[6:8]
            day = date[8:10]
            iso += year + '-' + month + '-' + day
    if (docType == "verso"):
        dateSearch = re.match("[0-9]+[.]+[0-9]+[.]+[0-9]+", str)
        if (dateSearch):
            splitDate = str.split(".")
            day = splitDate[0]
            if len(day) == 1:
                day = "0" + day
            month = splitDate[1]
            if len(month) == 1:
                month = "0" + month
            year = "19" + splitDate[2]
            iso += year + '-' + month + '-' + day
    return iso


def sectionTemplate():
    obj = {}
    obj['type'] = docType
    obj['manuscript'] = ""
    obj['ger'] = ""
    obj['eng'] = ""
    obj['date'] = ""
    obj["pt-number"] = ""
    obj["pt-page"] = ""
    obj["tlp-number"] = ""
    obj["cross-references"] = ""
    obj["original-type"] = ""
    return obj


# loops through the section and assigns properties to the object.
def assignProperties(sectionList):
    obj = sectionTemplate()
    for para in sectionList:
        date = extractIsoDate(para)
        if date:
            obj['date'] = date.strip()
        if ('Ms-' in para):
            obj['manuscript'] = para.strip()
            if ("v" in para):
                obj["original-type"] = "verso"
            else:
                obj["original-type"] = "recto"
        if ("&&F" in para):
            new_formal = para.replace("&&F", "")
            obj['ger'] += '<p>' + new_formal.strip() + '</p>'
            obj['eng'] += '<p>' + new_formal.strip() + '</p>'
        if ("&&G" in para):
            new_ger = para.replace("&&G", "")
            obj['ger'] += '<p>' + new_ger.strip() + '</p>'
        if ("&&E" in para):
            new_eng = para.replace("&&E", "")
            obj['eng'] += '<p>' + new_eng.strip() + '</p>'
        if (dot in repr(para) and "Cf" not in repr(para)):
            loc = para.split('\t')
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


def createJson():
    doc = docx.Document(docType + ".docx")
    all_paras = doc.paragraphs
    formatted_paras = formatParas(all_paras)
    listOfSections = createSections(formatted_paras)
    jsonList = []
    for section in listOfSections:
        obj = assignProperties(section)
        jsonList.append(obj)
    return jsonList


def writeFile(jsonList):
    with open(docType + '.json', 'w', encoding='utf8') as f:
        json.dump(jsonList, f, indent=4, ensure_ascii=False)


print('Creating ' + docType + '.json...')
file = createJson()
writeFile(file)
