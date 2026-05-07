import {  Injectable } from '@nestjs/common';
import {   UserRepo } from '../module/Db';
import { GenderType } from 'src/common';


@Injectable()
export class seedDataService {
  constructor(
    private readonly userRepo: UserRepo,

  ) { }

  //======================== seedData =====================
async seedStudents() {
 const studentData = [
  {
    fName: "lojy",
    lName: "ibrahem",
    email: "lojyIbrahem@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "1",
    subjects: ["Math", "English"],
    hobbies: ["Reading", "Drawing"]
  },
  {
    fName: "Yousef",
    lName: "Tarek",
    email: "yousef2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "2",
    subjects: ["Science", "Math"],
    hobbies: ["Football", "Gaming"]
  },
  {
    fName: "Mariam",
    lName: "Nasser",
    email: "mariam2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "3",
    subjects: ["Arabic", "English"],
    hobbies: ["Music", "Reading"]
  },
  {
    fName: "Omar",
    lName: "Fouad",
    email: "omar2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "1",
    subjects: ["Math", "Computer"],
    hobbies: ["Coding", "Gaming"]
  },
  {
    fName: "Salma",
    lName: "Hassan",
    email: "salma2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "2",
    subjects: ["Science", "Arabic"],
    hobbies: ["Cooking", "Reading"]
  },
  {
    fName: "Adham",
    lName: "Mostafa",
    email: "adham2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "3",
    subjects: ["Math", "Physics"],
    hobbies: ["Swimming", "Football"]
  },
  {
    fName: "Lara",
    lName: "Samir",
    email: "lara2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "1",
    subjects: ["English", "Science"],
    hobbies: ["Drawing", "Music"]
  },
  {
    fName: "Khaled",
    lName: "Mahmoud",
    email: "khaled2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "2",
    subjects: ["Math", "Arabic"],
    hobbies: ["Gaming", "Football"]
  },
  {
    fName: "Nour",
    lName: "Ehab",
    email: "nour2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "3",
    subjects: ["Biology", "Science"],
    hobbies: ["Reading", "Swimming"]
  },
  {
    fName: "Hussein",
    lName: "Ali",
    email: "hussein2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "1",
    subjects: ["Math", "English"],
    hobbies: ["Coding", "Chess"]
  },
  {
    fName: "Rehab",
    lName: "Said",
    email: "rehab2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "2",
    subjects: ["Arabic", "History"],
    hobbies: ["Reading", "Music"]
  },
  {
    fName: "Maher",
    lName: "Hany",
    email: "maher2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "3",
    subjects: ["Physics", "Math"],
    hobbies: ["Gaming", "Football"]
  },
  {
    fName: "Dalia",
    lName: "Saber",
    email: "dalia2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "1",
    subjects: ["English", "Science"],
    hobbies: ["Drawing", "Reading"]
  },
  {
    fName: "Zain",
    lName: "Omar",
    email: "zain2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "2",
    subjects: ["Math", "Computer"],
    hobbies: ["Coding", "Gaming"]
  },
  {
    fName: "Heba",
    lName: "Yasser",
    email: "heba2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "3",
    subjects: ["Biology", "English"],
    hobbies: ["Music", "Reading"]
  },
  {
    fName: "Tamer",
    lName: "Ashraf",
    email: "tamer2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "1",
    subjects: ["Math", "Science"],
    hobbies: ["Football", "Swimming"]
  },
  {
    fName: "Farah",
    lName: "Adel",
    email: "farah2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "2",
    subjects: ["Arabic", "History"],
    hobbies: ["Reading", "Drawing"]
  },
  {
    fName: "Islam",
    lName: "Ramy",
    email: "islam2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "3",
    subjects: ["Physics", "Math"],
    hobbies: ["Gaming", "Chess"]
  },
  {
    fName: "Aya",
    lName: "Sami",
    email: "aya2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.female,
    grade: "1",
    subjects: ["English", "Science"],
    hobbies: ["Music", "Reading"]
  },
  {
    fName: "Mostafa",
    lName: "Gamal",
    email: "mostafa2@gmail.com",
    password: "1Lojy@1234",
    cPassword: "1Lojy@1234",
    gender: GenderType.male,
    grade: "2",
    subjects: ["Math", "Arabic"],
    hobbies: ["Football", "Coding"]
  }
];

  for (const student of studentData) {
    const exists = await this.userRepo.findOne({ email: student.email });
    if (exists) continue;

    await this.userRepo.create(student);
  }

  return { message: "done" };
}
}


