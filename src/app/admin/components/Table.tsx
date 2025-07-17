import React from "react";
import styles from "./Table.module.css";

const columns = [
//   { field: "loan_request_id", header: "Loan Request ID" },
//   { field: "property_type_id", header: "Property Type ID" },
  
  { field: "reference_number", header: "Reference Number" },
  
  
  { field: "name", header: "Name" },
  { field: "suffix", header: "Suffix" },
  { field: "birth_date", header: "Birth Date" },
  { field: "email_address", header: "Email Address" },
  { field: "citizenship", header: "Citizenship" },
  { field: "country", header: "Country" },
  { field: "address", header: "Address" },
  { field: "terms", header: "Terms" },
  { field: "status", header: "Status" },
  { field: "source_of_income", header: "Source of Income" },
  { field: "empOrBusiness", header: "Employer/Business" },
  { field: "designation", header: "Designation" },
  { field: "price", header: "Price" },
  { field: "down_payment", header: "Down Payment" },
  { field: "gross_monthly_income", header: "Gross Monthly Income" },
  { field: "date_requested", header: "Date Requested" },
//   { field: "date_created", header: "Date Created" },
//   { field: "date_updated", header: "Date Updated" },
];

const data = [
  {
    // loan_request_id: 1,
    // property_type_id: 101,
    date_requested: "01-01-2024",
    reference_number: "REF123456",
    price: 1000000,
    down_payment: 200000,
    terms: 12,
    status: "Pending",
    first_name: "John",
    middle_name: "A.",
    last_name: "Doe",
    suffix: "Jr.",
    birth_date: "01-01-1990",
    email_address: "john.doe@example.com",
    citizenship: "Filipino",
    country: "Philippines",
    provinceOrState: "Metro Manila",
    cityOrTown: "Quezon City",
    barangay: "Bagumbayan",
    streetNameAndSpecAddress: "123 Main St",
    source_of_income: "Employment",
    empOrBusiness: "ABC Corp",
    designation: "Manager",
    gross_monthly_income: 50000,
    date_created: "01-01-2024",
    date_updated: "01-02-2024",
  },
  {
    // loan_request_id: 2,
    // property_type_id: 102,
    date_requested: "02-01-2024",
    reference_number: "REF654321",
    price: 2000000,
    down_payment: 400000,
    terms: 24,
    status: "Approved",
    first_name: "Jane",
    middle_name: "B.",
    last_name: "Smith",
    suffix: "Sr.",
    birth_date: "02-02-1985",
    email_address: "jane.smith@example.com",
    citizenship: "Filipino",
    country: "Philippines",
    provinceOrState: "Cebu",
    cityOrTown: "Cebu City",
    barangay: "Lahug",
    streetNameAndSpecAddress: "456 Second St",
    source_of_income: "Business",
    empOrBusiness: "XYZ Trading",
    designation: "Owner",
    gross_monthly_income: 100000,
    // date_created: "02-01-2024",
    // date_updated: "02-02-2024",
  },
];

const Table = () => {
  return (
    <div className={styles.tableOuterContainer}>
      <table className={styles.tableContainer}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th
                key={col.field}
                className={styles.headerCell}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx) => (
            <tr key={row.loan_request_id} className={styles.bodyRow}>
              {columns.map((col) => (
                <td key={col.field} className={styles.bodyCell}>
                  {col.field === "name"
                    ? `${row.first_name} ${row.middle_name} ${row.last_name}`.replace(/  +/g, ' ').trim()
                    : col.field === "address"
                      ? `${row.provinceOrState}, ${row.cityOrTown}, ${row.barangay}, ${row.streetNameAndSpecAddress}`.replace(/, +/g, ', ').replace(/^, |, $/g, '').trim()
                      : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
};

export default Table;
