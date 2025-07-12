// src/models/LoanApplication.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/sequelize';

export const LoanApplication = sequelize.define('LoanApplication', {
  ref: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanType: DataTypes.STRING,
  unitType: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  downPayment: DataTypes.FLOAT,
  monthlyPayment: DataTypes.FLOAT,
  term: DataTypes.INTEGER,
  borrower: DataTypes.STRING,
  contactNumber: DataTypes.STRING,
  email: DataTypes.STRING,
  birthday: DataTypes.DATE,
  incomeType: DataTypes.STRING,
  employer: DataTypes.STRING,
  designation: DataTypes.STRING,
  grossIncome: DataTypes.FLOAT,
  address: DataTypes.STRING,
}, {
  tableName: 'LoanApplications',
  timestamps: true,             
});
