module.exports = (sequelize, DataTypes) => {
  const BeritaTerkini = sequelize.define("BeritaTerkini", {
    judul: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return BeritaTerkini;
};
