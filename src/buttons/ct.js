const discord = require('discord.js');

module.exports = async (client, interaction) => {
	const button = new discord.ActionRowBuilder().addComponents(
		new discord.ButtonBuilder()
			.setCustomId('cct')
			.setLabel('Confirmo minha escolha')
			.setStyle(discord.ButtonStyle.Primary),
	);
	const requiredRoles = ['494205309225795585', '485488846990213121', '1169697807347761263'];

	const hasRequiredRole = requiredRoles.some(roleId => interaction.member.roles.cache.has(roleId));

	if (!hasRequiredRole)
		return interaction.reply({ content: 'Desculpe, você não tem o cargo necessário para usar esta ação.', ephemeral: true });

	interaction
		.reply({
			content: `Gostaria de confirmar o encerramento do seu ticket?`,
			components: [button],
		});
};

