@echo off
if "%1" == "--version" (
	echo Cassidy 0.1.0 BETA
) else if "%1" == "--help" (
	echo.
	echo. Usage: cassidy {option/target} {option}
	echo. Options:
	echo.
	echo. --help     :Has to be the first parameter, shows usage.
	echo. --version  :Has to be the first parameter, shows the current version of the DevKit.
	echo. --compile  :Has to be the second parameter, compiles file.
	echo.
) else (
	echo. To start, type:
	echo.   cassidy --help 
)
exit /b
