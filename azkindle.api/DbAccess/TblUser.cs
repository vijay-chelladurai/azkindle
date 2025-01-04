using System;
using System.Collections.Generic;

namespace azkindle.api.dbAccess;

public partial class TblUser
{
    public long Id { get; set; }

    public string FullName { get; set; }

    public string EmailAddress { get; set; }

    public string Password { get; set; }

    public string Role { get; set; }

    public string Comments { get; set; }

    public virtual ICollection<TblOrder> TblOrders { get; set; } = new List<TblOrder>();
}
