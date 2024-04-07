import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try {
        const saltRound = 10; //make a strong password create round
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;
    } catch (error) {
        console.log(`Error hashpassword : ${error}`);
    }

}

export const comparePassword = async (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}