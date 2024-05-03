db.createUser(
    {
        user: "mongodbteste",
        pwd: "12345678asdasd",
        roles: [
            {
                role: "readWrite",
                db: "superheroidb4"
            }
        ]
    }
);
db.createCollection("log");