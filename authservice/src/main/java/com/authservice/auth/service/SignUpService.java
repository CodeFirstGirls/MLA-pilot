package com.authservice.auth.service;

import org.springframework.stereotype.Service;

@Service
public class SignUpService{

    public boolean validatePassword(String userPassword){
        //Code by Namrata
        //updated by Mohsina
        //^: Asserts the start of the line.
        //(?=.*[A-Z]): Positive lookahead to ensure that the password contains at least one uppercase letter.
        //(?=.*\d): Positive lookahead to ensure that the password contains at least one digit.
        //(?=.*[@$!%*?&]): Positive lookahead to ensure that the password contains at least one special character among @$!%*?&
        //$: Asserts the end of the line.
        //Minimum 6 characters long and maximum 12 characters long, At least 1 uppercase letter and 1 lowercase letter, At least 1 special character among @$!%*?&
         
        String pattern = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{6,12}$";
        // Check if the string matches the pattern
            return userPassword.matches(pattern);
            
            

    }

}