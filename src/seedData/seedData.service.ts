import { TokenService } from '../common/service/token.service';
import { Injectable } from '@nestjs/common';
import { appointmentRepo, availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../module/Db';
import { Types } from 'mongoose';


@Injectable()
export class seedDataService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly appointmentRepo: appointmentRepo,
    private readonly availableTimeRepo: availableTimeRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,

  ) { }

  //======================== getProfile =====================

  async seedDoctors() {
    const doctorsData = [
      {
        fName: "Loujain ",
        lName: "Ibrahem",
        email: "lojyigfrffgbrgvafghem7@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: "female",
        price: 25,
        specialization: "الطب الطارئ",
        confirmed: "true",
        role: "Doctor"
      },
      {
        fName: "Salma ",
        lName: "Emad",
        email: "salmfggrfgfvaEmad@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: "female",
        price: 25,
        specialization: "أمراض الدم",
        confirmed: "true",
        role: "Doctor"
      },

    ];

    // 2. استخدام الميثود اللي عملناها في الـ DbRepo لإضافة كل الدكاترة مرة واحدة
    const createdDoctors = await this.userRepo.createMany(doctorsData);

    console.log(`✅ تم إضافه دكتور بنجاح!`);
    return createdDoctors;


  }

  async seedCompanion() {
    const companionsData = [
      {
        fName: "Aya",
        lName: "Mohamed",
        email: "ayaMoffhrfvamed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: "female",
        patientId: null,
        relationPatient: "mother",
        experienceLevel: "djf",
        role: "Companion"

      },
      {
        fName: "mohamed",
        lName: "Ahmed",
        email: "mohrafmeffd@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: "female",
        patientId: null,
        relationPatient: "fatrher",
        experienceLevel: "djf",
        role: "Companion"

      },]
    const createdCompanions = await this.userRepo.createMany(companionsData);
    console.log(`✅ تم إضافه مرافق بنجاح!`);
    return createdCompanions;
  }


 async seedpatient(doctors: any[], companions: any[]) {
  const patientsData = [
    {
      fName: "Amahaya",
      lName: "jah",
      email: "mahafffr@gmail.com",
      password: "1Lojy@1234",
      cPassword: "1Lojy@1234",
      age: 20,
      address: "25st",
      phone: "01022501044",
      gender: "female",
      blood: "AB+",
      currentMedication: "Fdf",
      disease: "fr",
      doctorId: doctors[0]._id,      // المريض الأول مع الدكتور الأول
      companionId: companions[0]._id, // المريض الأول مع المرافق الأول
      role: "Patient"
    },
    {
      fName: "nour",
      lName: "Mohamed",
      email: "nofuffr@gmail.com",
      password: "1Lojy@1234",
      cPassword: "1Lojy@1234",
      age: 22,
      address: "30st",
      phone: "01099999999",
      gender: "female",
      blood: "O+",
      currentMedication: "None",
      disease: "none",
      doctorId: doctors[1]._id,      // المريض الثاني مع الدكتور الثاني
      companionId: companions[1]._id, // المريض الثاني مع المرافق الثاني
      role: "Patient"
    }
  ];

  // تأكدي من عمل return للنتيجة لكي تستلميها في seedAll
  return await this.userRepo.createMany(patientsData);
}


  async seedAll() {

    // 2. كرتي الدكاترة
    const doctors = await this.seedDoctors();

    // 3. كرتي المرافقين
    const companions = await this.seedCompanion();

    // 4. كرتي المرضى وابعثي ليهم IDs الدكاترة والمرافقين
    const patients = await this.seedpatient(doctors, companions);

    // 5. الآن نربط المرافق بالمريض (الخطوة اللي ناقصاكي)
    // هنحدث كل مرافق بالـ ID بتاع المريض الخاص بيه
    await this.userRepo.updateOne(
      { _id: companions[0]._id },
      { patientId: patients[0]._id }
    );

    await this.userRepo.updateOne(
      { _id: companions[1]._id },
      { patientId: patients[1]._id }
    );

    console.log("✅ All data seeded and cross-linked successfully!");

  }



}


