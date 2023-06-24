# Test Automation Project
##### Welcome to the Test Automation project! This project uses WebDriverIO as the automation tool, Jasmine as the test framework, Chrome as the browser, and Visual Studio Code as the IDE. Below you will find instructions on how to install and configure the development environment, as well as an overview of the project and its goal.

## About Test Automation
Test automation is a practice in the field of software quality that involves the use of tools and scripts to execute tests in an automated manner. Instead of testing manually, scripts are written that simulate a user's actions and verify that the application is working correctly. This allows for more efficient, repeatable, and scalable testing.

## Environment Settings
Follow the steps below to set up your development environment and run automated tests:

### Dependencies
        Node.js version 18 or up is a pre-requisite.
        Google chrome.
        VS Code or any other code editor is necessary.

### Installation

How to install this repository

```bash
        Download the project from this repository.
        Run git bash (or any other) terminal on the project's folder.
        Run npm install on the terminal to install every dependency of the package.json.
        Run code . to see the code
```
You're ready to run the tests!

### Deployment

You should use the following command in the terminal to deploy this project run

```bash
  npx wdio
```
### CONCLUSION

In conclusion, when working with the users "locked_out_user" and "problem_user" in the login process, certain complications were encountered that affected the test automation.

The user "locked_out_user" experienced the difficulty of being locked out, which prevented a successful login. This required specific validation to verify that a proper error message was displayed indicating that the user was locked out. Also, due to the locked-out nature of this user, further functionality testing was not possible after the login attempt.

On the other hand, the user "problem_user" did not present any significant difficulties in terms of blocking or restrictions. However, additional testing was still required to verify that the user could successfully access the home page after login.

In general, working with users who have different states and conditions in the login process can add complexity to automated tests. Specific scenarios, such as error handling and error message validation, need to be considered to ensure that tests are accurate and thorough.

In summary, complications when working with the "locked_out_user" and "problem_user" users in the login process included locking the user out and needing to validate specific error messages. These complications highlight the importance of considering different scenarios and conditions when conducting automated tests, as well as the need for effective communication and coordination with the development team.