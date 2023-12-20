# speedtest-node
Executes a bash script every 30 minute for testing internet bandwidth using speedtest.net, outputs results to text file

Based on https://github.com/sfrechette/speedtest-node

# Pre-requisites
## Node
install using `brew install node` if required.
## speedtest-cli
install using `brew install speedtest-cli` if required.

# Steps to execute
1. Clone the repo.
2. `cd node-speedtest`
3. `chmod +x speedtest.sh` if required.
4. `npm install` - installing node dependencies
5. `node speedtest.js -s <comma separated list of SSIDs to monitor> -f <frequency in minutes>`
6. eg: `node speedtest.js -s NETWORK_NAME1,NETWORK_NAME2 -f 30` will monitor the listed network names by running this script every 30 minutes.
7. Keep the process running to collect over a long period.
