import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserRoleEnum } from 'src/common/enums';

@Injectable()
export class RoleValidationPipe implements PipeTransform {

  transform(value: any) {

    if (!value.role) {
      throw new BadRequestException('Role is required');
    }

    // 🩺 Doctor
    if (value.role === UserRoleEnum.Doctor) {

      if (!value.specialization) {
        throw new BadRequestException('Specialization required for doctor');
      }
    if (!value.price) {
        throw new BadRequestException('price required for doctor');
      }
      if (value.disease || value.currentMedication || value.blood || value.age ||
          value.doctorId || value.companionId || value.patientId) {
        throw new BadRequestException('Doctor cannot have patient/companion fields');
      }
    }

    // 🧑‍⚕️ Patient
    else if (value.role === UserRoleEnum.Patient) {

      if (!value.age || !value.disease || !value.blood || !value.currentMedication) {
        throw new BadRequestException('Missing required patient fields');
      }

      if (value.specialization) {
        throw new BadRequestException("Patient cann't have specialization");
      }
    }

    // 🤝 Companion
    else if (value.role === UserRoleEnum.Companion) {

      if (!value.relationPatient || !value.experienceLevel ||!value.patientId) {
        throw new BadRequestException('Missing companion required fields');
      }

      if ( value.blood || value.disease || value.currentMedication ||
          value.specialization || value.companionId) {
        throw new BadRequestException('Companion cannot have doctor/patient fields');
      }
    }

    return value;
  }
}
