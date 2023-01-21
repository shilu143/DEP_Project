import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:web_socket_channel/io.dart';

class Otp_verifification extends StatefulWidget {
  const Otp_verifification({super.key});

  @override
  State<Otp_verifification> createState() => _Otp_verifificationState();
}

class _Otp_verifificationState extends State<Otp_verifification> {
  void sendMessage(msg) {
    IOWebSocketChannel? channel;
    // We use a try - catch statement, because the connection might fail.
    try {
      // Connect to our backend.
      channel = IOWebSocketChannel.connect('ws://localhost:3000');
      print(channel.toString());
    } catch (e) {
      // If there is any error that might be because you need to use another connection.
      print("Error on connecting to websocket: " + e.toString());
    }
    // Send message to backend
    channel?.sink.add(msg);

    // Listen for any message from backend
    channel?.stream.listen((event) {
      // Just making sure it is not empty
      if (event!.isNotEmpty) {
        print(event);
        // Now only close the connection and we are done here!
        channel!.sink.close();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(50.0),
        child: Column(
          children: [
            Text(
              'Enter Verification code',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 30),
            ),
            SizedBox(height: 30),
            OtpTextField(
              enabledBorderColor: Colors.black,
              numberOfFields: 5,
              borderColor: Color(0xFF512DA8),
              //set to true to show as box or false to show as dash
              showFieldAsBox: true,
              //runs when a code is typed in
              onCodeChanged: (String code) {
                //handle validation or checks here
                print(code);
              },
              //runs when every textfield is filled
              onSubmit: (String verificationCode) {
                print(verificationCode);

                sendMessage(verificationCode);
                /* showDialog(
                    context: context,
                    builder: (context) {
                      return AlertDialog(
                        title: Text("Verification Code"),
                        content: Text('Code entered is $verificationCode'),
                      );
                    }); */
              }, // end onSubmit
            ),
            SizedBox(height: 30),
            SizedBox(
                height: 35,
                width: 100,
                child: TextButton(onPressed: () {}, child: Text('ResendOTP')))
          ],
        ),
      ),
    );
  }
}
