export interface AuthResponse {
    accessToken: string;
    Municipio: number;
    rol: number;
    user: UserLogin;
    message: string;
}

export interface UserLogin {
    id: number;
    dniNumber: number;
    email: string;
    name: string;
    lastname: string;
    rol: string;
    status: boolean;
    photo: string;
    phone: number;
    municipality: string;
    area: string;
    position: string;
    headquarters: string;
    headquartersId: number;
    contractType: string;
    dateStartContract: Date;
    managerName: string;
    managerLastName: string;
}
