const USER_STATUS = {
    approved :"APPROVED",
    pending :"PENDING",
    rejected :"REJECTED"
}

const USER_ROLE = {
    customer :"CUSTOMER",   
    admin :"ADMIN",
    theatreOwner :"THEATREOWNER"
}

const STATUS_CODES ={
    success : 200,
    created : 201,
    badRequest : 400,
    unauthorized : 401,
    forbidden : 403,
    notFound : 404,
    internalServerError : 500


}

export { USER_STATUS,
         USER_ROLE, 
        STATUS_CODES } 