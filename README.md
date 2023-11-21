# FinniHealthTakeHome

Features:
- Login and Sign Up
- Main Dashboard
  - Display of patient data
  - Add new patient data form

Notes:
- As for the display of patient data, a table makes the most sense in my head
- Not every patient will have the same data as some patients may have additional fields that others may not
  - Ways to address this:
    - Display only the data fields that we know every single patient will have and then have a detailed view of everything (via modal)
      - Pros: 
        - Quick glance and navigation of patient data
        - No need to go back and worry about losing progress of where you were on the page previously
      - Cons:
        - 
    - Display only the names of patients and status and then upon click on patient entry, redirect to a separate page containing full patient details (storing state in the url)
      - Pros:
        - Cleans up UI for list of data entries
        - Can present more data
      - Cons:
        - Will have to reload page everytime user wants to go back and view all patients
        - Not necessary to store state in url because the patient data isn't going to be shared via url or at all for that matter
      
- Opting for NoSQL just because the schema may change as users are able to add fields as they please

Game Plan:
- Set up backend connection to MongoDB
- Set up schema for a new entry
  - Required: First name, last name, DOB, Status (Inquiry, Onboarding, Active, Churned), Address
  - Optional: Middle name, Additional fields
- Write API funcitonality
  - POST API for new patients
  - GET to get all entries
  - GET for specific entries
  - DELETE for specific entries
  - UPDATE to easily make changes
- Create frontend 
  - Main display
  - Button to add a new entry
  - Button within each row to open modal for all data
- Go back and set up SQL DB for user data
  - Set up tables for individual users
  - Make sure to set up a key for mongodb data, to ensure connectivity btw user and respective data

