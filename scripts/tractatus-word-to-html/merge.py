import docx
import re
import json
import sys

stern = open("stern-translation.json", "r")
pt = open('ptSections.json', "r")
recto = open('recto.json', "r")
ptdata = json.load(pt)
ptSections = ptdata['sections']
rectoSections = json.load(recto)
sternJson = json.load(stern)
tlp = open("tlpSections.json", "r")
tlpdata = json.load(tlp)
tlpSections = tlpdata['sections']

def filterStern(List, key, val):
    for l in List:
        if (l[key] == val):
            return l

def normalizeTlpNum(tlpNum):
    num = tlpNum.strip()
    match = re.match("[^\s]+", num)
    try:
        num3 = match.group(0).replace("·", ".")
        num4 = num3.replace("*","")
        num5 = num4.replace("+","")
    except:
        num5 = ""    
    return num5

def findPtfromTlpNum(tlpNum, ptNumber):
    tlp = str(tlpNum)
    for section in ptSections:
        ptLabel = section['label']
        tlpRef = section['tlp'][0]
        tlpRef2 = str(tlpRef)
        if (tlp == tlpRef2 and ptLabel == str(ptNumber)):
            return section['str']

def findPtGerman(ptNumber):
    for section in ptSections:
        ptLabel = section['label']
        if (ptLabel == ptNumber):
            return section['ger']

def findTlpPassage(tlpNum):
    for section in tlpSections:
        tlpLabel = section['label']
        if (tlpLabel == tlpNum):
            return section['ger']

newList = []

for section in rectoSections:
    tlpNum = normalizeTlpNum(section['tlp-number'])
    ptNumber = section['pt-number'].strip()
    ptNumber = ptNumber.replace("·", ".")
    sternTranslation = filterStern(sternJson, 'tlp-number', tlpNum)
    sternPt = findPtfromTlpNum(tlpNum, ptNumber)
    tlpPassage = findTlpPassage(tlpNum)
    ptGerman = findPtGerman(ptNumber)
    new = section
    new['stern'] = ""
    new['pt-stern'] = ""
    new['original-ger'] = ""
    new['original-ger-pt'] = ""
    if (sternTranslation):
        new['stern'] = sternTranslation['eng']
    if (sternPt):
        new['pt-stern'] = '<p>'+sternPt+'</p>'
    if (tlpPassage):
        new['original-ger'] = tlpPassage
    if (ptGerman):
        new['original-ger-pt'] = ptGerman
    newList.append(new)

print("merging files...")

with open('recto.json', 'w', encoding='utf8') as f:
    json.dump(newList, f, indent=4, ensure_ascii=False)