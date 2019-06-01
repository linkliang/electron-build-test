const CERTIFICATE_NAME = "QuantConnect Corporation";

exports.default = async function(configuration) {
  const tokenPassword = () => {
    if (!process.env.TOKEN_KEY) {
      process.env.TOKEN_KEY = require("readline-sync").question(
        "\n\n\tPlease enter the password for the hardware token: ",
        {
          hideEchoBack: true
        }
      );
    }
    return process.env.TOKEN_KEY;
  };

  require("child_process").execSync(
    `java \
    -jar jsign-2.1.jar \
    --keystore hardwareToken.cfg \
    --storepass "${tokenPassword()}" \
    --storetype PKCS11 \
    --tsaurl http://timestamp.digicert.com \
    --alias "${CERTIFICATE_NAME}" \
    "${configuration.path}"
    `,
    {
      stdio: "inherit"
    }
  );
};