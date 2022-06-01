# Answers of exercise 1: Normalization

1. Violations of 1NF
dinner_date --> Every column needs to have only have one value and value type. In this perspective dinner_date column has different data type. Some rows have date data type, some strings.
food_code and food_description --> In the food_code and food_description columns have more than one value in every rows.
member_id --> In the member_id column values are not unique.

2. The entities from the table are:
    - member,
    - dinner,
    - venue,
    - food,
    - dinner_food,
    - member_dinner,
    - dinner_venue

3. In the 3NF perspective we can make 6 separate tables from existing table on the purpose of removing transitiveness.
    - The first table should be about the members and have member_id, member_name and member_address columns.
    - The second table should be about dinner and have dinner_id, dinner_date, food_code, venue_code columns.
    - The third table should be about venue and have venue_code, venue_description columns.
    - The fourth table should be about food and have food_code, food_description columns.
    - The fifth table should be about food and dinner relation. It needs dinner_id and food_code columns. There should be new row for each of the food for a dinner.
    - The sixth table should be about dinner and member and should have member_id and dinner_id columns.
    - The seventh table should be about dinner and venue and should have dinner_id and venue_code columns.
