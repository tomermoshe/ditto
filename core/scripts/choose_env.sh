#!/bin/bash
# Bash Menu Script Example

function choose_env {
    PS3='Please enter your env: '
    options=("dev" "prod" "arm" "Quit")
    select env in "${options[@]}"
    do
        case $env in
            "dev")
                echo "You choosed dev"
                break
                ;;
            "prod")
                echo "You choosed prod"
                break
                ;;
            "arm")
                echo "You choosed arm"
                break
                ;;
            "Quit")
                exit
                ;;
            *) echo "invalid option $REPLY";;
        esac
    done
}


