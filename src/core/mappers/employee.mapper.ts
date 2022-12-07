import { Employee } from '../dbModels/employee.js';
import { EmployeeDto } from '../dtos/employee.dto.js';
import { MapperFromDB } from './mapper.js';

class EmployeeMapper implements MapperFromDB<Employee, EmployeeDto> {
  public fromDB(data: Employee): EmployeeDto {
    return {
      id: data.IDe,
      firstName: data.eFirstName,
      lastName: data.eLastName,
      patronymic: data.ePatronymic,
      position: data.ePosition,
    };
  }
}

export const employeeMapper = new EmployeeMapper();
