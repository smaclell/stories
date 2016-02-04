exit if Rails.env != "development"

time = Paragraph.create! :text => 'Once upon a time'

#starter = Starter.create! :paragraph => time



programmer = [
  'There was a programmer',
  'His name was Scott MacLellan',
  'He loves learning new things and building cool projects',
  'Don\'t you like passionate programmers who care about what they do?',
]


cop = [
  'There was a cop',
  'His name was John McClane',
  'He did not like Hans Gruber',
  'One day they got into a fight',
  'John had a trick up his sleeve',
  'All of a sudden John starter laughing',
  'He pulled out a gun an shot Hans!',
  'yippee ki yay Mother-',
]

def create_story(start, paragraphs)
  last = start
  for paragraph in paragraphs
    last = Paragraph.create! :text => paragraph, :parent => last
  end
end

create_story time, programmer
create_story time, cop # time cop, hee hee
