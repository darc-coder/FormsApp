package com.nitin.formsapp;

import java.util.Arrays;

public class validate {
    private static boolean notNull(String value){
        return (value != null && !value.matches("\\s+"));
    }

    private static boolean validateMonth(String MonthYear){
        String[] Months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

        String MonthLower = MonthYear.toLowerCase();
        String MonthUpper = MonthYear.substring(0, 1).toUpperCase() + MonthLower.substring(1);
        String[] ArrOfStr = MonthUpper.split(",", 2);

        for (int i = 0; i < ArrOfStr.length; i++) {
            ArrOfStr[i] = ArrOfStr[i].trim();
        }
        String month = ArrOfStr[0];
        String year = ArrOfStr[1];
        boolean validMonth = false;
        boolean validYear = false;

        for (String s : Months) {
            if (s.equals(month)) {
                validMonth = true;
                break;
            }
        }

        if(year.matches("20\\d\\d")){
            validYear = true;
        }

        boolean valid;
        if (Arrays.asList(new Boolean[]{validMonth, validYear}).contains(false))
            valid = false;
        else
            valid = true;

        return valid;
    }

    public static String[] validateData(String[] data){
        String domainId = data[0];
        String fullName = data[1];
        String month_Yr = data[2];

        Boolean[] validData = new Boolean[]{false, false, false};

        String Error = "";

        // Domain ID not null
        if(notNull(domainId))
            validData[0] = true;
        else
            Error += "Domain Id Mustn't be Null.";

        if(notNull(fullName))
            validData[1] = true;
        else
            Error += " Full Name Mustn't be Null.";

        if(notNull(month_Yr)){
            if(validateMonth(month_Yr))
                validData[2] = true;
            else
                Error += " Month and Year provided is invalid or not in correct format (MMM,YYYY).";
        }
        else
            Error += " Month and Year Mustn't be Null.";

        Boolean valid;
        if (Arrays.asList(validData).contains(false))
            valid = false;
        else
            valid = true;

        return new String[]{valid.toString(), Error};
    }
}
