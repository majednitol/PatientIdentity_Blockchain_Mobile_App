import Contract from "../contract/contractRepo";

export default class AddPrescription {
    static addingPrescription = async (user: any, url: any) => {
       console.log("done adding", url, user);
    //     const contract = await Contract.fetchContract();
    // const prescription = await contract?.addPrescription(user, url)

    //     await prescription.wait();
        console.log("done adding")
   }
}