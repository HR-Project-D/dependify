import string

class Version:
  def __init__(self, mayor_, minor_ = "none", revision_ = "none"):
    if (minor_ != "none" and revision_ != "none"):
      self.mayor = mayor_
      self.minor = minor_
      self.revision = revision_
    elif (minor_ != "none" and revision_ == "none"):
      self.mayor = mayor_
      self.minor = minor_
      self.revision = 0
    else:
      txt = mayor_.split('.')
      if len(txt) >= 3:
        self.mayor = int(self.pruned(txt[0]))
        self.minor = int(self.pruned(txt[1]))
        self.revision = int(self.pruned(txt[2]))
      elif len(txt) == 2:
        self.mayor = int(self.pruned(txt[0]))
        self.minor = int(self.pruned(txt[1]))
        self.revision = 0
      elif len(txt) == 1:
        self.mayor = int(self.pruned(txt[0]))
        self.minor = 0
        self.revision = 0
      else:
        self.mayor = 0
        self.minor = 0
        self.revision = 0

  def pruned(self, txt):
    for character in list(string.ascii_letters + string.punctuation):
      txt = txt.replace(character, "")
    return txt

  # ==
  def __eq__(self, other):
    return self.mayor == other.mayor and self.minor == other.minor and self.revision == other.revision

  # <
  def __lt__(self, other):
    return self.mayor < other.mayor or (self.mayor == other.mayor and self.minor < other.minor) or (self.mayor == other.mayor and self.minor == other.minor and self.revision < other.revision)

  # <=
  def __le__(self, other):
    return self.mayor < other.mayor or (self.mayor == other.mayor and self.minor < other.minor) or (self.mayor == other.mayor and self.minor == other.minor and self.revision < other.revision) or (self.mayor == other.mayor and self.minor == other.minor and self.revision == other.revision)

  # >
  def __gt__(self, other):
    return self.mayor > other.mayor or (self.mayor == other.mayor and self.minor > other.minor) or (self.mayor == other.mayor and self.minor == other.minor and self.revision > other.revision)

  # >=
  def __ge__(self, other):
    return self.mayor > other.mayor or (self.mayor == other.mayor and self.minor > other.minor) or (self.mayor == other.mayor and self.minor == other.minor and self.revision > other.revision) or (self.mayor == other.mayor and self.minor == other.minor and self.revision == other.revision)