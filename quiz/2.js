// ร้านค้าขายมือถือแห่งหนึ่ง จะขายโทรศัพท์ให้กับผู้ซื้อที่อายุ 20 ปีเท่านั้น
export default function quiz() {
  const buyerAges = [18, 20, 23, 11, 12];
  return buyerAges.filter((x) => x < 20).length == 0;
}
