export class Helper {
  static convertPriceToNumber(price: string): number {
    return Number(price.replace(/[^0-9.]/g, ""));
  }

  static getProductDetails() {
    return {
      productName: "MacBook",
      productQuantity: "1",
      totalPrice: "$602.00",
    };
  }

  static getLoginDetails() {
    return {
      email: "pavanol@xyz.com",
      password: "test@123",
    };
  }

  static getOrangeHRMLoginDetails() {
    const username = process.env.ORANGEHRM_USERNAME;
    const password = process.env.ORANGEHRM_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "ORANGEHRM_USERNAME and ORANGEHRM_PASSWORD must be set to run OrangeHRM tests.",
      );
    }

    return { username, password };
  }

  static getOrangeHRMEmployeeDetails() {
    return {
      firstName: "Thou123",
      lastName: "sha456",
    };
  }
}
