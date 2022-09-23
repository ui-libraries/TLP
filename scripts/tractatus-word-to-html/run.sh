#!/bin/sh
python extract.py recto
python extract.py verso
python merge.py
node main