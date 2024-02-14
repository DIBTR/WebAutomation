# Performanace Test Engineering #

Which tool we are using : We are using artillery.io to generate load using playwright function test.
Documention : https://www.artillery.io/docs

Installation : https://www.artillery.io/docs/get-started/get-artillery

Command to run test : artillery run --output test-run-report.json browser-load-test.yml

Generate to report :  artillery report test-run-report.json

Report Path : Root directory from where we are running tests - 

Report file name : test-run-report.json.html