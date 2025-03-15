function skillsMember() {
  const member = {
    name: "John Doe",
    age: 30,
    skills: ["HTML", "CSS", "JavaScript"],
  };

  function addSkill(skill) {
    member.skills.push(skill);
  }

  function removeSkill(skill) {
    member.skills = member.skills.filter((s) => s !== skill);
  }

  function getSkills() {
    return member.skills;
  }

  return { addSkill, removeSkill, getSkills };
}