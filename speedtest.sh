#speedtest
#!/bin/bash
NOW=$(date +"%Y%m%d")
touch speedtest_log.txt
OUTPUT=`speedtest-cli`
echo "$OUTPUT" | tee -a speedtest_log.txt
