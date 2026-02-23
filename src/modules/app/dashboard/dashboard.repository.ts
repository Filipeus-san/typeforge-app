export function countUsers(): number {
    const result = sqlQuery<{ count: number }>("SELECT COUNT(*)::int as count FROM users", []);
    return result.length > 0 ? result[0].count : 0;
}
