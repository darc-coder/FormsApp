<%--
  Created by IntelliJ IDEA.
  User: nila1020
  Date: 21-12-2021
  Time: 17:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Forms App</title>
    <link href="resources/style.css" rel="stylesheet">
    <script src="resources/script.js" defer></script>
</head>
<body>
<div class="container">
    <div class="card">

        <div class="left-image">
            <div class="img-circle-anim"></div>
            <div class="img-circle-main"></div>
            <span class="left-arrow">
                    <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32">
                        <g>
                            <path d="M1.293,15.293L11,5.586L12.414,7l-8,8H31v2H4.414l8,8L11,
                                26.414l-9.707-9.707 C0.902,16.316,0.902,15.684,1.293,15.293z">
                            </path>
                        </g>
                    </svg>
                </span>
            <div class="calendar-img">
                <div class="top">
                    <span class="circle"><span class="line"></span></span>
                    <span class="circle"><span class="line"></span></span>
                    <span class="circle"><span class="line"></span></span>
                    <span class="circle"><span class="line"></span></span>
                </div>
                <div class="bottom">
                    <div class="text" id="month-text">Jan</div>
                </div>
            </div>
        </div>

        <div class="right-form">
            <form action="${pageContext.request.contextPath}/submit" autocomplete="off" method="post">
                <div class="heading">
                    Monthly Status Report Details
                </div>
                <div class="input-box domain-input">
                    <label for="domainId"> Domain ID </label>
                    <input type="text" id="domainId" name="domainId" required>
                    <div class="datalist Domain-datalist hidden"></div>
                    <span class="input-info-text hidden">A new User will be created with this Domain ID.</span>
                </div>

                <div class="input-box name-input">
                    <label for="fullName"> Full Name </label>
                    <input type="text" id="fullName" name="fullName" required>
                    <div class="datalist Name-datalist hidden"></div>
                    <span class="input-info-text hidden">Enter your Full Name. it cannot be changed later.</span>
                </div>

                <div class="input-box month-input">
                    <label for="month"> Select Month and Year </label>
                        <input type="text" name="month" id="month" readonly required>
                    <div class="month-year hidden">
                        <div class="year">
                            <span class="year-back">&lt;</span>
                            <span class="year-text"></span>
                            <span class="year-next">&gt;</span>
                        </div>
                        <div class="month-picker"></div>
                    </div>
                </div>

                <div class="input-box check-box">
                    <label for="option-1"> Did you send status report?</label>
                    <div class="check-box-input">
                        <input type="radio" name="select" id="option-1" value="True" required>
                        <input checked id="option-2" name="select" type="radio" value="False">
                        <label for="option-1" class="option option-1">
                            <div class="dot"></div>
                            <span>Yes</span>
                        </label>
                        <label for="option-2" class="option option-2">
                            <div class="dot"></div>
                            <span>No</span>
                        </label>
                    </div>
                </div>

                <button type="submit" class="btn btn-submit">SUBMIT</button>

            </form>
        </div>

            <div class="right-submitted hidden">
                <div class="loading hidden">
                    <div class="lds-ring">
                        <div style="--delay: 0s"></div>
                        <div style="--delay: -0.45s"></div>
                        <div style="--delay: -0.30s"></div>
                        <div style="--delay: -0.15s"></div>
                    </div>
                </div>
                <div class="server-msg">
                    <h2 id="success">Great! Your response has been submitted!</h2>
                    <h2 id="failure">Woah! There was a problem with your submission! Please Check Your response</h2>
                    <div class="message"></div>
                </div>

                <div class="success wrapper" style="--circle-color: #4caf50;">
                    <svg class="checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
                    </svg>
                </div>

                <div class="failure wrapper" style="--circle-color: #f44336;">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark_circle" cx="26" cy="26" r="25" fill="none"></circle>
                        <path class="checkmark_check" fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"></path>
                    </svg>
                </div>

                <button type="button" class="btn btn-submit hidden">SUBMIT ANOTHER</button>
            </div>

        </div>
    </div>
</body>
</html>
