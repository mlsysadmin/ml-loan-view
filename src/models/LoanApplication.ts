import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/sequelize';

export const LoanApplication = sequelize.define('loan_requests', {
  loan_request_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  property_type_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  date_requested: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reference_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  down_payment: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  terms: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending',
  },
  ckyc_id: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  middle_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  suffix: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  contact_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  citizenship: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },



  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  provinceOrState: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  cityOrTown: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  barangay: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // street_address: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // specific_address: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // Ge usa na ni sila into
  streetNameAndSpecAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  //////////////////////////

  source_of_income: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  empOrBusiness: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  gross_monthly_income: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'loan_requests',
  timestamps: false,
});



// export const LoanApplication = sequelize.define('LoanApplication', {
//   ref: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   loanType: DataTypes.STRING,
//   unitType: DataTypes.STRING,
//   amount: DataTypes.FLOAT,
//   downPayment: DataTypes.FLOAT,
//   monthlyPayment: DataTypes.FLOAT,
//   term: DataTypes.INTEGER,
//   borrower: DataTypes.STRING,
//   contactNumber: DataTypes.STRING,
//   email: DataTypes.STRING,
//   birthday: DataTypes.DATE,
//   incomeType: DataTypes.STRING,
//   employer: DataTypes.STRING,
//   designation: DataTypes.STRING,
//   grossIncome: DataTypes.FLOAT,
//   address: DataTypes.STRING,
// }, {
//   tableName: 'LoanApplications',
//   timestamps: true,
// });
