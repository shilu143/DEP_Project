import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import './login_page.dart';

class Choose_role extends StatefulWidget {
  const Choose_role({super.key});

  @override
  State<Choose_role> createState() => _Choose_roleState();
}

class _Choose_roleState extends State<Choose_role> {
  int index = -1;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Select your role',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40)),
            SizedBox(height: 20),
            TextButton(
              onPressed: () {
                setState(() {
                  index = 0;
                });
              },
              child: Text('Student',
                  style: TextStyle(
                      color: (index == 0) ? (Colors.white) : (Colors.black),
                      fontSize: 20)),
              style: ButtonStyle(
                  shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      side: BorderSide(
                        color: (index == 0) ? (Colors.white) : (Colors.black),
                        width: 1,
                      ),
                      borderRadius: BorderRadius.circular(10))),
                  backgroundColor: (index == 0)
                      ? MaterialStateProperty.all(Colors.black)
                      : MaterialStateProperty.all(Colors.white)),
            ),
            SizedBox(height: 15),
            TextButton(
              onPressed: () {
                setState(() {
                  index = 1;
                });
              },
              child: Text('Course Instructor',
                  style: TextStyle(
                      color: (index == 1) ? (Colors.white) : (Colors.black),
                      fontSize: 20)),
              style: ButtonStyle(
                  shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      side: BorderSide(
                        color: (index == 1) ? (Colors.white) : (Colors.black),
                        width: 1,
                      ),
                      borderRadius: BorderRadius.circular(10))),
                  backgroundColor: (index == 1)
                      ? MaterialStateProperty.all(Colors.black)
                      : MaterialStateProperty.all(Colors.white)),
            ),
            SizedBox(height: 15),
            TextButton(
              onPressed: () {
                setState(() {
                  index = 2;
                });
              },
              child: Text('Batch Advisor',
                  style: TextStyle(
                      color: (index == 2) ? Colors.white : Colors.black,
                      fontSize: 20)),
              style: ButtonStyle(
                  shape: MaterialStateProperty.all(RoundedRectangleBorder(
                      side: BorderSide(
                        color: (index == 2) ? (Colors.white) : (Colors.black),
                        width: 1,
                      ),
                      borderRadius: BorderRadius.circular(10))),
                  backgroundColor: (index == 2)
                      ? MaterialStateProperty.all(Colors.black)
                      : MaterialStateProperty.all(Colors.white)),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          if (index == -1) {
            showDialog(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    title: Text("Error"),
                    content: Text('Please select a role'),
                  );
                });
          } else {
            String role = "";
            if (index == 0) {
              role = "Student";
            } else if (index == 1) {
              role = "Course Instructor";
            } else if (index == 2) {
              role = "Batch Advisor";
            }
            Navigator.of(context).push(PageTransition(
                type: PageTransitionType.rightToLeftJoined,
                duration: Duration(milliseconds: 500),
                reverseDuration: Duration(milliseconds: 500),
                child: Login(text: role),
                childCurrent: widget));
          }
        },
        label: const Text('Proceed'),
        backgroundColor: Colors.green,
        /* child: Text('Proceed'), */
      ),
    );
  }
}
