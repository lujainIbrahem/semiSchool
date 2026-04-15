import { TokenService } from '../common/service/token.service';
import { Injectable } from '@nestjs/common';
import { appointmentRepo, availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../module/Db';
import { GenderType, specializationType, UserRoleEnum } from 'src/common';


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
        fName: "loujain ",
        lName: "Ibrahem",
        email: "loujainIbrahem@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.female,
        price: 850,
        specialization: specializationType.EmergencyMedicine,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "salma ",
        lName: "Emad",
        email: "salmaEmad@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01035645582",
        gender: GenderType.female,
        price: 550,
        specialization: specializationType.GeneralSurgerySpecialization,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "mrehan ",
        lName: "adel",
        email: "mrehanAdel@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "1stgiza",
        phone: "01025458255",
        gender: GenderType.female,
        price: 630,
        specialization: specializationType.InternalMedicineSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "mohamed ",
        lName: "frag",
        email: "mohamedFrag@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st new Cairo",
        phone: "0123501044",
        gender: GenderType.male,
        price: 360,
        specialization: specializationType.Nephrology,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "ahmed ",
        lName: "mostafa",
        email: "ahmedMostafa@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st mohamedAli",
        phone: "0102266094",
        gender: GenderType.male,
        price: 750,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "razan",
        lName: "diab",
        email: "razanMohamed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.female,
        price: 450,
        specialization: specializationType.chestSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "yousef ",
        lName: "shaban",
        email: "yousefShaban@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.male,
        price: 990,
        specialization: specializationType.PhysicalTherapy,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "nour",
        lName: "mostafa",
        email: "nourmostafa@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501034",
        gender: GenderType.female,
        price: 720,
        specialization: specializationType.Psychiatry,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "ahmed",
        lName: "saif",
        email: "ahmedSaif@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "0102250234",
        gender: GenderType.male,
        price: 360,
        specialization: specializationType.chestSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "menna ",
        lName: "osama",
        email: "mennaOsama@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501144",
        gender: GenderType.female,
        price: 640,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
    ];

    for (const doctor of doctorsData) {
      const exists = await this.userRepo.findOne({ email: doctor.email })
      if (!exists) {
        await this.userRepo.create(doctor)
      }

    }

    return { message: "done" }
  }
}




