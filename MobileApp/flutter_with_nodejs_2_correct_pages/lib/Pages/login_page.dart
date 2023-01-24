import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';
import './otp_verification.dart';
import 'package:page_transition/page_transition.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'dart:async';

var role = '';

class Login extends StatefulWidget {
  String text = '';
  Login({Key? key, required this.text}) : super(key: key);
  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String? _message;
  String check = '0', bhai = '';
  // This function will send the message to our backend.

  Future<void> checccc() async {
    int isEmpty = 0;
    if (_message!.isNotEmpty) {
      var nish = await sendMessage(_message);
      print('after then');
    }
    /* print("outside=${DateTime.now().millisecondsSinceEpoch}");
          print(check); */
    print('shaurya=${check}');
    if (check == '1') {
      Navigator.of(context).push(PageTransition(
        type: PageTransitionType.rightToLeftJoined,
        duration: Duration(milliseconds: 500),
        reverseDuration: Duration(milliseconds: 500),
        child: Otp_verifification(email: _message,),
        childCurrent: widget));
    }
  }

  Future<void> sendMessage(msg) async {
    print("inside=${DateTime.now().millisecondsSinceEpoch}");
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

    channel?.sink.add(msg);

    // Listen for any message from backend
    var completer = Completer();
    channel?.stream.listen((event) {
      // Just making sure it is not empty
      if (event!.isNotEmpty) {
        print("inside_get=${DateTime.now().millisecondsSinceEpoch}");
        check = event;
        print('inside_get_${check}');
        print(event.runtimeType);
        /* print(event); */
        // Now only close the connection and we are done here!
        channel!.sink.close();
        completer.complete();
      }
    });
    await completer.future;
    /* return ""; */
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(50, 0, 50, 0),
        child: Column(
          children: [
            SizedBox(height: 60),
            Align(
                alignment: Alignment.centerLeft,
                child: Text(widget.text,
                    style:
                        TextStyle(fontSize: 40, fontWeight: FontWeight.bold))),
            /* SizedBox(height:100,child:Text('Voices')), */
            SizedBox(height: 60),
            Align(
                alignment: Alignment.centerLeft,
                child: Text('Welcome Back',
                    style:
                        TextStyle(fontSize: 60, fontWeight: FontWeight.bold))),
            SizedBox(height: 40),
            Center(
              child: TextField(
                onChanged: (e) => _message = e,
                decoration: InputDecoration(
                  hintText: 'Email',
                  suffixIcon: TextButton(
                    child: Text('Send OTP'),
                    onPressed: () async {
                      await checccc();
                    },
                  ),
                ),
              ),
            ),
            SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}
