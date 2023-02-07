import 'package:flutter/material.dart';

class Homepage extends StatefulWidget {
  Homepage({super.key});

  // final List<Person> data = [
  //   Person('John', 25),
  //   Person('Mary', 69)
  // ];

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  final List<Person> data = [Person('John', 25), Person('Mary', 69)];

  String? selected = '2';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: DataTable(
          columns: [
            DataColumn(label: Text('Name')),
            DataColumn(label: Text('Age')),
            DataColumn(label: Text('Action')),
          ],
          rows: data
              .map((person) => DataRow(
                    cells: [
                      DataCell(Text(person.name)),
                      DataCell(Text(person.age.toString())),
                      DataCell(Expanded(
                        child: DropdownButton<String>(
                          value: '1',
                          items: [
                            DropdownMenuItem(
                              child: Text('Add'),
                              value: '1'
                            ),
                            DropdownMenuItem(
                              child: Text('Drop'),
                              value: '2'
                            ),
                          ],
                          onChanged: (String? value) {
                            setState(() {
                              selected = value;
                            });
                          },
                        ),
                      )),
                    ],
                  ))
              .toList(),
        ),
      ),
    );
  }
}

class Person {
  final String name;
  final int age;

  Person(this.name, this.age);
}
