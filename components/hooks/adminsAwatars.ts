export const getAdminsAvatars = (role: string) => {
    switch(role) {
        case "SUPERADMIN":
            return "/images/ninja.jpg"
        case "ADMIN":
            return "/images/samuray.jpeg"
        default: 
            return "/images/japan.png"
    }
}

