// lib/requireAdmin.js

/**
 * Middleware pour protéger les routes API admin
 * Vérifie que le cookie "admin" vaut "1"
 * Sinon renvoie un statut 401 (non autorisé)
 *
 * @param {function} handler - Fonction handler de l'API à protéger
 * @returns {function} Nouvelle fonction handler protégée
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    const adminCookie = req.cookies.admin;

    if (adminCookie !== "1") {
      return res.status(401).json({ message: "Non autorisé" });
    }

    return handler(req, res);
  };
}