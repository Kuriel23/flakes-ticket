module.exports = (client, interaction) => {
	if (interaction.isStringSelectMenu()) {
		require('../menu/' + interaction.values[0])(
				client,
				interaction,
			);
	}
	if (interaction.isButton()) {
		require('../buttons/' + interaction.customId)(client, interaction);
	}
};
