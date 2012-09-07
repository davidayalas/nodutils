#!/bin/bash

for file in ./*.js

do
	nodeunit $file
done