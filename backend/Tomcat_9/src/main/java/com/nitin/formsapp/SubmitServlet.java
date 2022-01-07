package com.nitin.formsapp;

import com.google.gson.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;


@WebServlet(name = "SubmitServlet", value = "/submit")
public class SubmitServlet extends HttpServlet {
    private String WriteToFile(String Filepath, JsonObject jsonData){
        try (FileWriter fileWriter = new FileWriter(Filepath)) {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            gson.toJson(jsonData, fileWriter);
            return "OK";
        }
        catch (IOException e){
            e.printStackTrace();
            return "Error during Writing to File"+e.getMessage();
        }
    }
    private String extractMonth(String Month){
        String MonthLower = Month.toLowerCase();
        String MonthUpper = Month.substring(0, 1).toUpperCase() + MonthLower.substring(1);
        String[] arrOfStr = MonthUpper.split(",", 2);

        for (int i = 0; i < arrOfStr.length; i++) {
            arrOfStr[i] = arrOfStr[i].trim();
        }
        String month = arrOfStr[0];
        String year = arrOfStr[1];

        return month+year;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/frontend/error404.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

        String fullPath = getServletContext().getRealPath("/WEB-INF/data.json");
        File inputFile = new File(fullPath);
        String domainId = request.getParameter("domainId");
        String name = request.getParameter("fullName");
        String month = request.getParameter("month");
        Boolean sent = Boolean.parseBoolean(request.getParameter("select"));
        String ExtractedMonth = extractMonth(month);

        try {
            JsonElement fileElement = JsonParser.parseReader(new FileReader(inputFile));
            JsonObject fileObject = fileElement.getAsJsonObject();

            String[] ValidAndError = validate.validateData(new String[]{domainId, name, month});

            boolean Valid = Boolean.parseBoolean(ValidAndError[0]);
            String Error = ValidAndError[1];

            domainId = domainId.trim();
            name = name.trim();

            System.out.println(fullPath);

            // if user/domainId already exist, just updating "sentMonths"
            if (fileObject.has(domainId)){
                if(Valid){
                    fileObject.get(domainId).getAsJsonObject().get("sentMonths").getAsJsonObject().addProperty(ExtractedMonth, sent);
                    String successOrError = WriteToFile(fullPath, fileObject);
                    response.setContentType("plain/text");
                    response.getWriter().println(successOrError);
                }
                else {
                    response.setContentType("plain/text");
                    response.getWriter().println(Error);
                }
            }
            // creating new user
            else{
                System.out.printf("%s %s %s %s", domainId, name, ExtractedMonth, sent);
                if(Valid){
                    String JSONString = "{fullName: \"\", sentMonths: {}, extraInfo: {}}";

                    JsonObject newUser = JsonParser.parseString(JSONString).getAsJsonObject();
                    newUser.addProperty("fullName", name);
                    fileObject.add(domainId, newUser);
                    fileObject.get(domainId).getAsJsonObject().get("sentMonths").getAsJsonObject().addProperty(ExtractedMonth, sent);
                    String successOrError = WriteToFile(fullPath, fileObject);
                    response.setContentType("plain/text");
                    response.getWriter().println(successOrError);
                }
                else{
                    response.setContentType("plain/text");
                    response.getWriter().println(Error);
                }
            }
        }
        catch (Exception e){
            System.err.println("Error Occurred!");
            e.printStackTrace();
        }
    }
}
