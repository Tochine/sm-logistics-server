module.exports.emailVerification = (url, name) => {
  return `<body>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&display=swap" rel="stylesheet">
   <style>
       * {
           box-sizing: border-box;
       }
       body {
           padding: 0;
           margin: 0;
           font-family: 'Poppins', sans-serif;
       }
       .logo-wrapper {
           margin-bottom: 20px;
       }
       .page-wrapper {
           width: 100%;
           height: 100vh;
           display: flex;
           justify-content: center;
           flex-direction: column;
           align-items: center;
           background-color: rgb(214, 214, 214);
       }
       .card {
           width: 400px;
           background-color:white;
           border-radius: 4px;
           border-top: 3px solid orange;
           padding: 40px 25px;
       }
       h1 {
           font-weight: 600;
           font-size: 24px;
       }
       a {
           color: orange;
       }
       a.btn {
           background-color: orange;
           color: black !important;
           display: block;
           padding: 20px;
           text-align: center;
           border-radius: 8px;
       }
       .action {
           margin-top: 30px;
           margin-bottom: 40px;
       }
       .highlight {
           color: rgb(187, 187, 187) !important;
       }
   </style>
   <section class="page-wrapper" style="
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   background-color: rgb(214, 214, 214);
   ">
       <div class="logo-wrapper" style="margin-bottom: 20px;">
           <img src="#" alt="log" />
       </div>
       <div class="card" style="
       width: 400px;
       background-color:white;
       border-radius: 4px;
       border-top: 3px solid orange;
       padding: 40px 25px;
       ">
           <h1>Confirm Email verification</h1>
           <p>Hi ${name} </p>
           <p>Your account has been created successfully</p><br>
           <p>Thanks for showing interest to partner with <h3> SM Logistics</h3><br>Please tap the button bellow to confirm your email</p>
           <a href=${url}>Confirm</a>
           <p> If you didnt create an account on <a href="https://sm-logistics.netlify.app">SM Logistics</a> you can delete this email</p>
           <p class="highlight">Having questions? Reach out to any of us using the methods below</p>
           <a href="mailto:" >sample@gmail.com</a>
           <div style="margin-top: 15px;">
               <img src="http" />
               <img src="http" />
               <img src="http" />
           </div>
       </div>
   </section>
</body>`;
};

module.exports.resetPasswordToken = (url, name) => {
  return `
    <body>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            padding: 0;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        }
        .logo-wrapper {
            margin-bottom: 20px;
        }
        .page-wrapper {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: rgb(214, 214, 214);
        }
        .card {
            width: 400px;
            background-color:white;
            border-radius: 4px;
            border-top: 3px solid orange;
            padding: 40px 25px;
        }
        h1 {
            font-weight: 600;
            font-size: 24px;
        }
        a {
            color: orange;
        }
        a.btn {
            background-color: orange;
            color: black !important;
            display: block;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
        }
        .action {
            margin-top: 30px;
            margin-bottom: 40px;
        }
        .highlight {
            color: rgb(187, 187, 187) !important;
        }
        .word-break {
            word-breaker: break-all;
        }
    </style>
    <section class="page-wrapper" style="
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: rgb(214, 214, 214);
    ">
        <div class="logo-wrapper" style="margin-bottom: 20px;">
            <img src="#" alt="log" />
        </div>
        <div class="card" style="
        width: 400px;
        background-color:white;
        border-radius: 4px;
        border-top: 3px solid orange;
        padding: 40px 25px;
        ">
            <h1>Password Reset</h1>
            <p>Hi ${name} </p>
            <p>Please use the link below to reset your password</p><br>
            <p>Your password reset token <a class="word-break" href=${url}>${url}</a></p>

            <p> If you didnt create an account on <a href="https://sm-logistics.netlify.app">SM Logistics</a> you can delete this email</p>
            <p class="highlight">Having questions? Reach out to any of us using the methods below</p>
            <a href="mailto:" >sample@gmail.com</a>
            <div style="margin-top: 15px;">
                <img src="http" />
                <img src="http" />
                <img src="http" />
            </div>
        </div>
    </section>
    </body>
    `;
};

module.exports.passwordResetSuccess = (name) => {
  return `
  <body>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&display=swap" rel="stylesheet">
  <style>
      * {
          box-sizing: border-box;
      }
      body {
          padding: 0;
          margin: 0;
          font-family: 'Poppins', sans-serif;
      }
      .logo-wrapper {
          margin-bottom: 20px;
      }
      .page-wrapper {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          background-color: rgb(214, 214, 214);
      }
      .card {
          width: 400px;
          background-color:white;
          border-radius: 4px;
          border-top: 3px solid orange;
          padding: 40px 25px;
      }
      h1 {
          font-weight: 600;
          font-size: 24px;
      }
      a {
          color: orange;
      }
      a.btn {
          background-color: orange;
          color: black !important;
          display: block;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
      }
      .action {
          margin-top: 30px;
          margin-bottom: 40px;
      }
      .highlight {
          color: rgb(187, 187, 187) !important;
      }
  </style>
  <section class="page-wrapper" style="
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgb(214, 214, 214);
  ">
      <div class="logo-wrapper" style="margin-bottom: 20px;">
          <img src="#" alt="log" />
      </div>
      <div class="card" style="
      width: 400px;
      background-color:white;
      border-radius: 4px;
      border-top: 3px solid orange;
      padding: 40px 25px;
      ">
          <h1>Password Reset Successful</h1>
          <p>Hi ${name} </p>

          <br><br>
          <p>Your password has been successfully changed. If you didn't change your password, follow this link to set a new one.
          If you think that someone else is trying to access your account.
          </p>

          <p class="highlight">Having questions? Reach out to any of us using the methods below</p>
          <a href="mailto:" >sample@gmail.com</a>
          <div style="margin-top: 15px;">
              <img src="http" />
              <img src="http" />
              <img src="http" />
          </div>
      </div>
  </section>
</body>
      `;
};

module.exports.otpMailTemplate = (name, otp) => {
  return `<body>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            padding: 0;
            margin: 0;
            font-family: 'Poppins', sans-serif;
        }
        .logo-wrapper {
            margin-bottom: 20px;
        }
        .page-wrapper {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            background-color: rgb(214, 214, 214);
        }
        .card {
            width: 400px;
            background-color:white;
            border-radius: 4px;
            border-top: 3px solid orange;
            padding: 40px 25px;
        }
        h1 {
            font-weight: 600;
            font-size: 24px;
        }
        a {
            color: orange;
        }
        a.btn {
            background-color: orange;
            color: black !important;
            display: block;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
        }
        .action {
            margin-top: 30px;
            margin-bottom: 40px;
        }
        .highlight {
            color: rgb(187, 187, 187) !important;
        }
    </style>
    <section class="page-wrapper" style="
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: rgb(214, 214, 214);
    ">
        <div class="logo-wrapper" style="margin-bottom: 20px;">
            <img src="#" alt="log" />
        </div>
        <div class="card" style="
        width: 400px;
        background-color:white;
        border-radius: 4px;
        border-top: 3px solid orange;
        padding: 40px 25px;
        ">
            <h1>OTP verification</h1>
            <p>Hi ${name} </p>
            <p>Use this 4 digit code to finish up your registration process</p>
            <p><a class="btn action">${otp}</a></p>
            <br><br>
            <p>Thanks for showing interest in <h3> SM Logistics</h3></p>
            <p> If you didnt create an account on <a href="https://sm-logistics.netlify.app/client/login">SM Logistics</a> you can delete this email</p>

            <p class="highlight">Having questions? Reach out to any of us using the methods below</p>
            <a href="mailto:" >sample@gmail.com</a>
            <div style="margin-top: 15px;">
                <img src="http" />
                <img src="http" />
                <img src="http" />
            </div>
        </div>
    </section>
 </body>`;
};
