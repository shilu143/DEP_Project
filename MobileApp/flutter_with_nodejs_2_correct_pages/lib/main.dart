import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';
import './Pages/login_page.dart';
import './Pages/otp_verification.dart';
import './Pages/choose_role.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': ((context) => Choose_role()),
      '/otp_verification': ((context) => Otp_verifification()),
      '/login': ((context) => Login(text:''))
    },
  ));
}
