#speedtest
#!/bin/bash
NOW=$(date +"%Y%m%d")
OUTPUT=`speedtest-cli --csv --secure`
echo "$OUTPUT" | tee -a data/speedtest_$NOW.txt