<!DOCTYPE html>
<html style="overflow: hidden" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Certificate</title>
    <style>

        .cursive {
            font-family: 'Pinyon Script', cursive;
        }

        .sans {
            font-family: 'Open Sans', sans-serif;
        }

        .bold {
            font-weight: bold;
        }

        .block {
            display: block;
        }

        .underline {
            border-bottom: 1px solid #777;
            padding: 5px;
            margin-bottom: 15px;
        }

        .margin-0 {
            margin: 0;
        }

        .padding-0 {
            padding: 0;
        }

        .pm-empty-space {
            height: 40px;
            width: 100%;
        }

        /* Body and Main Container */
        .body-template {
            padding: 20px 0;
            background: #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .pm-certificate-container {
            position: relative;
            width: 800px;
            height: 600px;
            background-color: #618597;
            padding: 30px;
            color: #333;
            font-family: 'Open Sans', sans-serif;
            box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        }

        .outer-border {
            width: 794px;
            height: 594px;
            position: absolute;
            left: 50%;
            margin-left: -397px;
            top: 50%;
            margin-top:-297px;
            border: 2px solid #fff;
        }

        .inner-border {
            width: 730px;
            height: 530px;
            position: absolute;
            left: 50%;
            margin-left: -365px;
            top: 50%;
            margin-top:-265px;
            border: 2px solid #fff;
        }

        .pm-certificate-border {
            position: relative;
            width: 720px;
            height: 520px;
            border: 1px solid #E1E5F0;
            background-color: rgba(255, 255, 255, 1);
            left: 50%;
            margin-left: -360px;
            top: 50%;
            margin-top: -260px;
        }

        .pm-certificate-block {
            width: 650px;
            height: 200px;
            position: relative;
            left: 50%;
            margin-left: -325px;
            top: 70px;
        }

        .pm-certificate-header {
            margin-bottom: 10px;
            text-align: center;
        }

        .pm-certificate-title h2 {
            font-size: 34px !important;
        }

        .pm-certificate-body .pm-name-text {
            font-size: 20px;
            text-align: center;
        }

        .pm-earned {
            margin: 15px 0 20px;
        }

        .pm-earned .pm-earned-text {
            font-size: 20px;
        }

        .pm-earned .pm-credits-text {
            font-size: 15px;
        }

        .pm-certified {
            font-size: 12px;
            text-align: center;
        }

        .pm-certified .underline {
            margin-bottom: 5px;
        }

        .pm-certificate-footer {
            width: 650px;
            height: 100px;
            position: relative;
            left: 50%;
            margin-left: -325px;
            bottom: -105px;
            text-align: center;
        }

        .btn-certificate {
            position: absolute;
            top: 640px;
            right: 10px;
        }

        .btn-certificate .button {
            text-decoration: none;
            background-color: #618597;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body class="body-template">
    <div class="container pm-certificate-container">
        <div class="outer-border"></div>
        <div class="inner-border"></div>
        
        <div class="pm-certificate-border">
            <div class="row pm-certificate-header">
                <div class="pm-certificate-title cursive">
                    <h2>Certificate of Completion</h2>
                </div>
            </div>

            <div class="row pm-certificate-body">
                <div class="pm-certificate-block">
                    <div>
                        <h3 style="text-align: center" >{{ $data['name'] }}</h3>
                        <p style="text-align: center" >has successfully completed the exam:</p>
                        <h4 style="text-align: center" >{{ $data['exam'] }}</h4>
                        <p style="text-align: center" >with a score of:</p>
                        <h4 style="text-align: center" >{{ $data['score'] }}</h4>
                        <p style="text-align: center" >Date: {{ $data['date'] }}</p>
                    </div>
                </div>
            </div>

            <div class="row pm-certificate-footer">
                <p><strong>Congratulations!</strong></p>
            </div>
        </div>
    </div>

    <div class="btn-certificate">
        <a href="{{ route('certificate.download', ['id' => request()->route('id')]) }}" class="button">Download Certificate</a>
    </div>
</body>
</html>
