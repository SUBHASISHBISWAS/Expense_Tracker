using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Expense_Tracker_API.Converters
{
	public class DateConverter:JsonConverter<DateTime>
	{
        private string dateFormat = "dd/MM/yyyy";
		public DateConverter()
		{
		}

        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return DateTime.ParseExact(reader.GetString(), dateFormat, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(dateFormat));
        }
    }
}

