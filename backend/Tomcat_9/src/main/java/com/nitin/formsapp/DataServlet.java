package com.nitin.formsapp;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;


@WebServlet(name = "DataServlet", value = "/data")
public class DataServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String fullPath = getServletContext().getRealPath("/WEB-INF/data.json");
        File inputFile = new File(fullPath);

        try {
            JsonElement fileElement = JsonParser.parseReader(new FileReader(inputFile));
            JsonObject fileObject = fileElement.getAsJsonObject();
            JsonObject sendObject = fileObject.deepCopy();

            for (String s : fileObject.keySet()) {
                // remove "sentMonths" by reference
                fileObject.get(s).getAsJsonObject().remove("sentMonths");
                // remove "extraInfo" by reference
                fileObject.get(s).getAsJsonObject().remove("extraInfo");

                sendObject.add(s, fileObject.get(s).getAsJsonObject());
            }
            String JSONString = sendObject.toString();

            response.setContentType("application/json");
            response.getWriter().println(JSONString);
        }
        catch (Exception e) {
            System.err.println("Error Occurred");
            e.printStackTrace();
        }

        response.setContentType("application/json");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/frontend/error404.jsp").forward(request, response);
    }
}
